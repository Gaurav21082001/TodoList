import { useState } from "react";
import { SIGNUP } from "./Mutation";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signup, { loading,error }] = useMutation(SIGNUP);

    const onSignup = () => {
        signup({
            variables: {
                name: name,
                email: email,
                password: password,
            }
        }).then(()=>alert("Register successfully"))

        if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
        
    }
    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h2>Signup</h2>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="">Password</label>
                        <input type="text" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </div>
                    <button className="btn btn-success" onClick={onSignup}>Signup</button>
                    <Link style={{marginLeft:30}} className="btn btn-primary" to='/'>Signin</Link>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default Signup;