import * as React from 'react';
import { Doc, getDoc, updateDoc } from 'app/services/docs';
import { RouteComponentProps } from 'react-router';
import { CommentListComponent } from 'app/components/Comments/List';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connect } from 'react-redux';
import { ApplicationState } from 'app/store';
import { Dispatch } from 'redux';
import { requestStatusesData } from 'app/store/statuses/actions';
import { Status } from 'app/services/statuses';

interface DocsDetailsPageState {
    doc: Doc | null;
}

interface DocsDetailsPageParams {
    docType: string;
    login: string;
    id: string;
}

interface injectedParams {
    statuses: Status[]
    loading: boolean
}

interface DocDetailsPageProps extends RouteComponentProps<DocsDetailsPageParams>, injectedParams {

}

interface DispatchProps {
    requestStatusesData(): void;
}

interface AllProps extends DocDetailsPageProps, DispatchProps {

}



class DocsDetailsPage extends React.Component<AllProps, DocsDetailsPageState> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            doc: null
        }
    }

    async changeStatus(statusId: number) {
        const doc = { ...this.state.doc!, status: statusId };
        const updatedDoc = await updateDoc(this.props.match.params.login, doc.id, doc);
        this.setState({
            doc: updatedDoc
        });
    }

    async componentDidMount() {
        this.props.requestStatusesData();
        const doc: Doc = await getDoc(this.props.match.params.login, parseInt(this.props.match.params.id));
        this.setState({ doc });
    }

    render() {
        const doc: Doc | null = this.state.doc;
        return (
            <div>
                {doc &&
                    <>
                        <div className="details">
                            <h2>{doc.subject}
                                <div className="float-right">
                                    <ButtonGroup>
                                        {this.props.statuses.map((status) => {
                                            return <Button key={status.id} onClick={() => { this.changeStatus(status.id!); }} variant={(status.id === doc.status) ? "primary" : "light"} >{status.name}</Button>
                                        })}
                                    </ButtonGroup>
                                    <Button variant="warning" className="ml-4" href={`/organizations/${this.props.match.params.login}/${this.props.match.params.docType}/${doc.id}/edit`}>Edit</Button>
                                </div></h2>

                            <p className="markdown-body" dangerouslySetInnerHTML={{ __html: doc.htmlDescription }}></p>
                        </div>
                        <div>
                            <h4>Comments</h4>
                            <CommentListComponent docId={doc.id} login={this.props.match.params.login}></CommentListComponent>
                        </div>

                    </>
                }
            </div>
        );
    };
}

const mapStateToProps = (state: ApplicationState): injectedParams => {
    return {
        statuses: state.statuses.statuses,
        loading: state.statuses.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        requestStatusesData: () => dispatch(requestStatusesData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocsDetailsPage as any); 