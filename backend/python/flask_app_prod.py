import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + "\\site-packages\\windows")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "/site-packages/linux")
from flask import Flask, request, redirect
import os


# dev additions
import mimetypes
from flask_socketio import SocketIO
import boto3
session_client = boto3.client(
    'sts',
    aws_access_key_id=    os.getenv('STS_CLIENT_ID'),
    aws_secret_access_key=os.getenv('STS_ACCESS_KEY'),
    region_name=os.getenv('S3_REGION_NAME')
)
session_info = session_client.get_session_token()
session_token = session_info.get("Credentials").get("SessionToken")
session_access_key_id = session_info.get("Credentials").get("AccessKeyId")
session_secret_access_key = session_info.get("Credentials").get("SecretAccessKey")
s3_client = boto3.client(
    's3',
    aws_access_key_id=    session_access_key_id,
    aws_secret_access_key=session_secret_access_key,
    aws_session_token=session_token,
    region_name=os.getenv('S3_REGION_NAME')
)
#

app = Flask(__name__)
PORT = os.environ.get("PORT")
PORT = PORT if PORT else 3005
app.config.update(
    # SERVER_NAME="127.0.0.1:{}".format(PORT),
    FLASK_ENV = 'production',
    SECRET_KEY=os.environ.get("FLASK_SOCKET_IO_SECRET_KEY")
)
sio = SocketIO(app,cors_allowed_origins="https://feroz-qrcode-app.netlify.app")

@sio.event
def connect():
    print("connected")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', os.environ.get('FRONTEND_ORIGIN'))
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route('/list/<user>',methods=['GET'])
def list_files(user):
    response = s3_client.list_objects_v2(
        Bucket=os.getenv('S3_BUCKET_NAME'),
        Prefix=user
    )    
    return {
        'status':200,
        'message':{
            'files':response.get('Contents')
        }
    }

@app.route('/upload/<user>', methods=['POST'])
def file_upload(user):
    
    # get a number list of the file
    response = s3_client.list_objects_v2(
        Bucket=os.getenv('S3_BUCKET_NAME'),
        Prefix=user
    )
    contents = 0 
    try:
        contents = len(response.get('Contents'))
    except BaseException as e:
        None
    #  

    # get the file mimetype extension
    ext  = mimetypes.guess_extension(request.headers.get('Content-Type'))
    # 
    
    # upload to s3 and get the url
    filename = '{}-{}{}'.format(user,contents,ext)

    with open(filename, 'wb') as f:
        f.write(request.data)
        f.close()
    with open(filename, 'rb') as f:
        s3_client.upload_fileobj(
            f, os.getenv('S3_BUCKET_NAME'), filename,
            ExtraArgs={
                'ContentType':'',
                'ACL':'public-read'
            }
        )
        f.close()
    if os.path.exists(filename):
        os.remove(filename)         
    # 

    # update the current list in the frontend
    sio.emit('update',{'new':'true'})
    # 
    
    return {
        'status': 200,
        'message':{
            'message':'OK',
            'object_url': "https://{}.s3.amazonaws.com/{}".format(
                os.getenv('S3_BUCKET_NAME'),
                filename 
            )
        }
    }

