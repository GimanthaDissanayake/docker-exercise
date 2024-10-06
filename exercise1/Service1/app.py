from flask import Flask, jsonify
import subprocess
import requests

app = Flask(__name__)

def get_ip_address():
    # Get the IP address of the container
    ip = subprocess.check_output("hostname -I", shell=True).decode().strip()
    return ip

def get_processes():
    # Get list of running processes
    processes = subprocess.check_output("ps -ax", shell=True).decode().split('\n')
    return processes

def get_disk_space():
    # Get disk space information
    disk_space = subprocess.check_output("df -h /", shell=True).decode().split('\n')
    return disk_space

def get_uptime():
    # Get time since last boot
    uptime = subprocess.check_output("uptime -p", shell=True).decode().strip()
    return uptime

def get_service2_info():
    # Make an HTTP request to Service2 for its system info
    try:
        response = requests.get('http://service2:8198/') 
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

@app.route('/', methods=['GET'])
def get_info():
    service1_info = {
        "Service1": {
            "ip_address": get_ip_address(),
            "processes": get_processes(),
            "disk_space": get_disk_space(),
            "uptime": get_uptime()
        },
        "Service2": get_service2_info()
    }
    return jsonify(service1_info)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8199)
