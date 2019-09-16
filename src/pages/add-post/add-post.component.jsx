import React from "react";

import AddPostForm from "../../components/add-post-form/add-post-form.component";

const AddPost = ({ history }) => (
  <div className="container">
    <AddPostForm history={history} />
  </div>
);

export default AddPost;
