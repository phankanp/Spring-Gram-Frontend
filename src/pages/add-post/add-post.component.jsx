import React from "react";

import AddPostForm from "../../components/create-post-form/create-post-form.component";

const AddPost = ({ history }) => (
  <div className="container">
    <AddPostForm history={history} />
  </div>
);

export default AddPost;
