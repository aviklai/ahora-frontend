import * as React from 'react';
import { Comment, getComments } from 'app/services/comments';
import { CommentDetailsComponent } from '../Details';
import { AddCommentComponent } from 'app/components/Comments/AddComment';

interface CommentsProps {
    docId: number;
    login: string;
}

interface State {
    comments?: Comment[];
}

export class CommentListComponent extends React.Component<CommentsProps, State> {
    constructor(props: CommentsProps) {
        super(props);

        this.state = {
            comments: undefined
        }
    }

    commentAdded(comment: Comment): void {
        const newComments: Comment[] = [...this.state.comments];
        newComments.push(comment);
        this.setState({
            comments: newComments
        });
    }

    async componentDidMount() {
        const comments: Comment[] = await getComments(this.props.login, this.props.docId)
        this.setState({
            comments
        });
    }

    render() {
        return (
            <div>
                {this.state.comments && this.state.comments.length > 0 &&
                    <div className="list">
                        {this.state.comments.map((comment: Comment) => {
                            return (<CommentDetailsComponent key={comment.id} comment={comment}></CommentDetailsComponent>);
                        })}
                    </div>
                }
                <div className="mt-2">
                    <AddCommentComponent commentAdded={(comment) => { this.commentAdded(comment) }} login={this.props.login} docId={this.props.docId}></AddCommentComponent>
                </div>
            </div>
        );
    }
}