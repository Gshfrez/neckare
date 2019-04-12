#!/bin/sh

# this fails because of wrong dimensions, however it demonstrates the REST interaction
curl -d '{"instances": [1.0, 2.0, 5.0]}' -X POST http://localhost:8501/v1/models/posture_model:predict
