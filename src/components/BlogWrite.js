import React from 'react';
import { Link } from 'react-router';
import { Segment, Card, Icon, Form, Input, TextArea, Button, Image } from 'semantic-ui-react';

class BlogWrite extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl:'',
            title: '',
            content: ''
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleBlogPost = this.handleBlogPost.bind(this);
    }

    handleImageChange(e) {

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
      };
      console.log(file.name);
      reader.readAsDataURL(file);
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.title
        });
        console.log(e.target.title+"title");
    }

    handleContentChange(e) {
        this.setState({
            content: e.target.content
        });
        console.log(e.target.content+"content");
    }

    handleBlogPost() {
        console.log(this.state);
        let file = this.state.file;
        let title = this.state.title;
        let content = this.state.content;
        this.props.onBlogPost(file, title, content).then(
            () => {
                this.setState({
                    file: "",
                    imagePreviewUrl: "",
                    title: "",
                    content: ""
                });
            }
        );
    }

    render(){
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if(imagePreviewUrl){
            imagePreview=(<Image src={imagePreviewUrl} />);
        }else{
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return(
                <Segment>
                    <Input name='photo' type='file' placeholder='Select Photo' onChange={this.handleImageChange} />
                    <Input name='title' type='text' placeholder='Insert Title'  onChange={this.handleTitleChange} />
                    <TextArea name='content' rows='3' placeholder='Insert Content.' onChange={this.handleContentChange} />
                    <Button className="btn-post" color='teal' onClick={this.handleBlogPost}>
                        <Icon name='write'/>
                        POST
                    </Button>
                    <div className="imgPreview">
                      {imagePreview}
                    </div>
                </Segment>

        )
    }
}

BlogWrite.propTypes = {
    onBlogPost: React.PropTypes.func
};

BlogWrite.defaultProps = {
    onBlogPost: (file,title,content) => { console.error('post function not defined'); }
};

export default BlogWrite;
