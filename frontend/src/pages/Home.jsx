import { useMutation, useQuery } from "@apollo/client";
import { GET_TASKS } from "./Query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { COMPLETE_TASK, DELETE_TASK } from "./Mutation";

function Home() {
    const { loading, error, data } = useQuery(GET_TASKS);
    useEffect(() => {
       
    });
    
    const naviagte=useNavigate();
    console.log(loading);
    console.log(error);
    console.log(data);
    const [completeTask] = useMutation(COMPLETE_TASK);
    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [GET_TASKS, "tasks"]
    });
    const onSave = (userid) => {
        const userId = parseFloat(userid);
        completeTask({
            variables: {
                id: userId,
            }
        })
    }
    const onDelete = (userid) => {
        const userId = parseFloat(userid);
        deleteTask({
            variables: {
                id: userId,
            }
        }).then(() => alert("Task deleted successfully"))
    }
    const onLogout=()=>{
        sessionStorage.removeItem("token");
        naviagte("/")
    }
    return (
        <div>
            <div className="row mb-5">
                <div className="col"></div>
                <div className="col" style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                    <h2>Your ToDo Items</h2>
                    <button onClick={onLogout} className="btn btn-link float-end">Logout</button>
                </div>
                <div className="col"></div>
            </div>
            <div className="row text-center">
                <div className="col">

                    <h4>Pending Todo Items</h4>
                    {
                        data?.tasks?.filter((task) => {

                            return task.isCompleted === false;

                        }).map((task, index) => {
                            return <div style={{borderRadius:10, margin:"30px 100px ", border: "1px solid gray", boxShadow: "5px 5px 5px lightgreen", height: "100px" }} key={index} >
                                <div><strong>{task.title}</strong></div>
                                <div>{task.details}</div>
                                <button onClick={() => onSave(task.id)} className="me-2 float-end" style={{ border: "1px solid lightgrey", borderRadius: "5px", background: "lightblue" }}>Mark as Completed</button>
                            </div>

                        })
                    }
                    <Link to='/createItem'>Add Task</Link>
                </div>
                <div className="col">
                    <h4>Completed Todo Items</h4>
                    {
                        data?.tasks?.filter((task) => {

                            return task.isCompleted === true;

                        }).map((task, index) => {
                            return <div style={{borderRadius:10,  margin:"30px 100px ", border: "1px solid gray", boxShadow: "5px 5px 5px lightgreen", height: "100px" }} key={index}>
                                <div><strong>{task.title}</strong></div>
                                <div>{task.details}</div>
                                <button onClick={() => onDelete(task.id)} className="me-2 float-end" style={{ border: "1px solid lightblack", borderRadius: "5px", background: "red" }}>Delete</button>

                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;