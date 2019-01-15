Thinking about using the code from the React Recipe app we wrote in activity "08-React Recipes" to write the friends component items. 
I'm editing up the code but will be moving it over to the friends.js. This file was to simply hold the code I got from the recipe app while I messed around with it and thought about how to write the friends. Will be deleted in the next update or so.   
FOR THE FRIENDS "cards": 
    Index.js Code: 
        import React from "react";
        import Thumbnail from "../Thumbnail";
        import { Container, Row, Col } from "../Grid";

        // Exporting both RecipeList and RecipeListItem from this file

        // RecipeList renders a bootstrap list item
        export function RecipeList({ children }) {
            return <ul className="list-group">{children}</ul>;
        }

        // FriendProfileListItems renders a bootstrap list item containing data from the keychain(?) api call
        export function FriendProfileListItems({
            thumbnail = "https://placehold.it/300x300",
            name,
            keychainLink,
        }) {
            return (
            <li className="list-group-item">
                <Container>
                    <Row>
                        <Col size="xs-4 sm-2">
                        <Thumbnail src={thumbnail} />
                        </Col>

                        <Col size="xs-8 sm-9">
                        <h3>{name}</h3>
                        <p>Click the link here to view  the keys on this Friend's Keychain! </p>
                        <a rel="noreferrer noopener" target="_blank" href={keychainLink}> Friends keychain Link ie. website.com/friend/:id
                        </a>
                        </Col>
                    </Row>
                </Container>
            </li>
        );
        }
FOR THE FRIEND CARD IMAGE TUMBNAILS
    Index.js code
    
        import React from "react";
        import "./style.css";

        The Thumbnail component renders a div that uses some CSS to render a background image
        It will always keep square proportions at any size without the image warping
        The "role" and "aria label" are there to identify the element's purpose as an image for accessibility purposes

        function Thumbnail({ src }) {
            return (
                <div
                className="thumbnail"
                role="img"
                aria-label="Recipe Image"
                style={{
                    backgroundImage: `url(${src})`
                }}
                />
            );
        }

        export default Thumbnail;


