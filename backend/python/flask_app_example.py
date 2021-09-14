import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + "\\site-packages\\windows")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "/site-packages/linux")
from flask import Flask, request, redirect
import os
from flask_socketio import SocketIO

# dev additions
from twilio.twiml.messaging_response import MessagingResponse
#

app = Flask(__name__)
PORT = os.environ.get("PORT")
PORT = PORT if PORT else 3005
app.config.update(
    # SERVER_NAME="127.0.0.1:{}".format(PORT),
    FLASK_ENV = 'production',
    SECRET_KEY=os.environ.get("FLASK_SOCKET_IO_SECRET_KEY")
)
sio = SocketIO(app,cors_allowed_origins="https://michaelodumosu57.github.io")

@sio.event
def connect():
    print("connected")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', os.environ.get('FRONTEND_ORIGIN'))
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route("/sms", methods=['GET', 'POST'])
def map_game():
    # configure app to work with directions
    body = request.values.get('Body', None)

    # Start our TwiML response
    resp = MessagingResponse()

    global current
    global use
    current = body
    sio.emit('direction',{'data':current})
    use = True

    # Add a message
    # resp.message("Moving Marker")

    return str(resp)

@app.route("/direction", methods=['GET'])
def get_dir():
    global use
    if use == True:
        use = False
        return current
    else:
        return "waiting"


# if __name__ == "__main__":
# def start_app():
#     app.run(debug=True)
