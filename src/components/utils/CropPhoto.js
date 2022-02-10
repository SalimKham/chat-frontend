/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux';
import { uploadPicture } from '../../actions/profileActions';
import ReactFileReader from 'react-file-reader';
class CropPhoto extends Component {
    constructor() {
        super();
        this.state = {
            crop: {
                x: 130,
                y: 50,
                width: 50,
                height: 50
            },
            data: null,
            errors:{},
            file: "",
            display_width: 0,
            display_height: 0


        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();  
        const { crop } = this.state;
        const cropString = crop.x + ":" + crop.y + ":" + crop.width + ":" + crop.height + ":" + this.state.display_width + ":" + this.state.display_height;
       
        this.props.uploadPicture(this.state.file, cropString)
        window.location.href = "/";
    }
    onChange = (crop) => {
        this.setState({ crop });
    }
    getFiles(files) {
        this.setState({ data: files.base64, file: files.fileList[0] })


    }

    onImageLoaded(image) {
        this.state.display_width = image.width;
        this.state.display_height = image.height;
   
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;
        const photo = (this.props.user.user && this.props.user.user.photo) ? this.props.user.user.photo : "/images/no-avatar.png";
        return (
            <div>
                <div class="wrapper fadeInDown">
                <img alt='' src={photo} class="picture" />
                <div class="input-groupe">
                {errors.error ? <div className="alert alert-danger" role="alert"> {errors.error} </div> : ""}
                {errors.result ? <div className="alert alert-success" role="alert"> {errors.result} </div> : ""}
            </div>
                    <form onSubmit={this.onSubmit} className="formContent align-center">
                        
                        <ReactCrop  id ="crop-space"onImageLoaded={this.onImageLoaded.bind(this)} src={this.state.data} crop={this.state.crop} onChange={this.onChange} />
                          


                        <ReactFileReader fileTypes={[".png", ".jpg"]} base64={true} multipleFiles={false} handleFiles={this.getFiles.bind(this)}>
                            <div className="input-groupe btn align-center">
                                <button type="button" className="btn bg-dark" style={{ color: 'white' }} data-toggle="tooltip" data-placement="left" title="Note: changes will be seen in the next login" >Change</button>
                            
                            </div>
                        </ReactFileReader>
                        {this.state.data&&<div className="input-groupe btn align-right">
                            <a href="/" className="btn bg-danger">Cancel</a>
                            <button type="submit" className="btn btn-success" >Save </button>
                        </div>}

                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.security,
    errors:state.errors
})
export default connect(mapStateToProps, { uploadPicture })(CropPhoto);
