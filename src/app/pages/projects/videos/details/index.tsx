import * as React from 'react';
import { Doc, getDoc } from 'app/services/docs';
import { RouteComponentProps } from 'react-router';

interface VideosDetailsPageState {
    video: Doc | null;
}

interface VideosDetailsPageParams {
    id: string;
}


interface Props extends RouteComponentProps<VideosDetailsPageParams> {

}


export default class VideosDetailsPage extends React.Component<Props, VideosDetailsPageState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            video: null
        };
    }

    async componentDidMount() {
        const video: Doc = await getDoc("ahora", parseInt(this.props.match.params.id));
        this.setState({
            video: video
        });
    }

    render = () => {
        const video = this.state.video;
        if (video) {
            return (
                <div>
                    <h2>video details: {video.subject}</h2>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe width="560" height="315" allowFullScreen
                            src={`https://www.youtube.com/embed/${video.metadata.youtubeId}?&autoplay=0`}></iframe>
                    </div>
                    <div className="mt-2 mt-b">
                    </div>
                    <div>{video.description}</div>
                    <div>{video.createdAt}</div>
                </div>
            );
        }
        else {
            return (<div>Loading....</div>)
        }

    };
}
