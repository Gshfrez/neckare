docker pull tensorflow/serving

# this command assumes that that neckare is in the directory /home/user
docker run -t --rm -p 8501:8501 \
	-v "/home/user/neckare/code/models/my_pose_classifier:/models/posture_model" \
	-e MODEL_NAME=posture_model tensorflow/serving &

sh test_serving.sh
