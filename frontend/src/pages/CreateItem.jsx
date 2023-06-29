import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_TASK } from "./Mutation";
import { useNavigate } from "react-router-dom";
import { GET_TASKS } from "./Query";

function CreateItem() {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const navigate=useNavigate();
    const [createTask, {loading,error,data}] = useMutation(CREATE_TASK,{
        refetchQueries:[
            GET_TASKS,
            'tasks'
        ]
    });
    const onSave = () => {
        createTask({
            variables: {
                title: title,
                details: details
            }
        }).then(()=>navigate('/home'));

        if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
    }
    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h2>Create Item</h2>
                    <div className="form-group">
                        <label htmlFor="">Title:</label>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="">Details:</label>
                        <textarea onChange={(e) => setDetails(e.target.value)} cols='11' rows='5' type="text" className="form-control" />
                    </div>
                    <button className="btn btn-success" onClick={onSave}>Save</button>
                    <button style={{ marginLeft: 30 }} onClick={()=>navigate("/home")} className="btn btn-danger">Cancel</button>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default CreateItem;