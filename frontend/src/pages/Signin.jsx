import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNIN } from "./Mutation";
import { Formik } from "formik";
import { GET_TASKS } from "./Query";

function Signin() {
    const initialValues = {
        email: "",
        password: "",
    };

    const [signin, { loading, error, data }] = useMutation(SIGNIN);
    console.log(data);
    const navigate = useNavigate();
    if(loading) return <h1>loading.....</h1>
    if(error) return <h1>error.....</h1>
    
    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h2>Signin</h2>
                    <Formik
                        initialValues={initialValues}

                        onSubmit={async (values, actions) => {
                            const xyz = await signin({
                                variables: {
                                    email: values.email,
                                    password: values.password
                                },
                                
                            });
                            const token = xyz.data.signin.token;

                            sessionStorage["token"] = token;
                            navigate('/access')
                            if (error) {
                                console.log(error);

                                actions.resetForm();
                                navigate('/Home')
                            }
                        }}>
                        {({ handleSubmit, values, handleChange, handleBlur, isSubmitting, errors, touched }) => (
                            <form onSubmit={handleSubmit} >
                                <div >
                                    <div className='input-block mt-2'>
                                        <label htmlFor='email'>Email</label>
                                        <input className='form-control' type='email' name='email' id='email' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur}>
                                        </input>
                                        {errors.email && touched.email ? (<p className='error'>{errors.email}</p>) : null}

                                    </div>
                                    <div className='input-block mt-2'>
                                        <label htmlFor='password'>Password</label>
                                        <input className='form-control' type='password' name='password' id='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur}></input>
                                        {errors.password && touched.password ? (<p className='error'>{errors.password}</p>) : null}

                                    </div>
                                    <button className='btn btn-success mt-2 ' style={{ marginLeft: '140px' }} type='submit' >SignIn</button>
                                    <div className='input-block mt-1'>Don't have an account ? <Link to="/signup">Signup</Link></div>
                                </div>
                            </form>
                        )}


                    </Formik>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default Signin;