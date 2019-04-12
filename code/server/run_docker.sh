docker pull tensorflow/serving

# this command assumes that that posture_model is in the directory /home/user
docker run -t --rm -p 8501:8501 \
	-v "/home/user/posture_model/my_img_classifier:/models/posture_model" \
	-e MODEL_NAME=posture_model tensorflow/serving &

# this fails because of wrong dimensions, however it demonstrates the REST interaction
curl -d '{"instances": [1.0, 2.0, 5.0]}' \
	-X POST http://localhost:8501/v1/models/posture_model:predict
