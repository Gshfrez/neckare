import tensorflow as tf

def export_saved_model(h5_model_input_path, pb_model_output_path):
    """
    Exports a h5 model (keras format) into pb model (tensorflow format)
    so that Tensorflow Serving can serve it.
    """
    # The export path contains the name and the version of the model
    tf.keras.backend.set_learning_phase(0)  # Ignore dropout at inference
    model = tf.keras.models.load_model(h5_model_input_path)
    export_path = pb_model_output_path

    # Fetch the Keras session and save the model
    # The signature definition is defined by the input and output tensors
    # And stored with the default serving key
    with tf.keras.backend.get_session() as sess:
        tf.saved_model.simple_save(
            sess,
            export_path,
            inputs={'input_image': model.input},
            outputs={t.name: t for t in model.outputs})


export_saved_model(h5_model_input_path='./model_img.h5',
        pb_model_output_path='./my_img_classifier/1')
