import React, { useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { Icon } from 'semantic-ui-react'


const SearchBar = ({ values, handleQuery }) => {

  useEffect(() => { handleQuery(values) }
    , [handleQuery, values])



  return (
    <section className="search-bar" >
      <h2>Catalog Page</h2>
      <Form>
        <label>
          <Field  name='search' type='search' placeholder='search an item' /><Icon name="search"/>
        </label>
      </Form>

    </section>
  );
}


export default withFormik({
  mapPropsToValues: props => ({
    search: "",
  })

})(SearchBar);