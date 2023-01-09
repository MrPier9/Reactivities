import { Button, Comment, CommentAction, CommentAuthor, CommentAvatar, CommentContent, CommentGroup, CommentMetadata, CommentText, Form, FormTextArea, Header, Segment } from "semantic-ui-react";

export default function ActivityDetailedChat() {
    return (
        <>
            <Segment
                textAlign="center"
                attached='top'
                inverted
                color="teal"
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <CommentGroup>
                    <Comment>
                        <CommentAvatar src="/assets/user.png" />
                        <CommentContent>
                            <CommentAuthor as='a'>Matt</CommentAuthor>
                            <CommentMetadata>
                                <div>Today at 5:42PM</div>
                            </CommentMetadata>
                            <CommentText>How artistic!</CommentText>
                            <CommentAction>Reply</CommentAction>
                        </CommentContent>
                    </Comment>

                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>5 days ago</div>
                            </Comment.Metadata>
                            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Form reply>
                        <FormTextArea />
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                        />
                    </Form>
                </CommentGroup>
            </Segment>
        </>
    )
}