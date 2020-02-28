import React from "react";
import { withFormik, Form, Field } from "formik";


const SearchBar = ({ values, handleQuery }) => {

 
handleQuery(values)


  return (
    <section >
     <Form>
       <label>
         <Field name='search' type='text' placeholder='search' />
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