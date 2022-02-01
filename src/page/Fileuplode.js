import axios from 'axios';
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const config = require('../config.json');

export default function Fileuplode() {
    //1.state/hook variable
    const [file, setFile] = useState('');
    const [data,setData] = useState({
        percent: 0,
        loading:false
    })

    //2.function
    let handaleChange=(e)=>{
        //console.log('change',e[0])
        setFile(e[0])
    }

    let uplodeImage= async (e)=>{ //Fat Arrow Function / Arrow function ES6  e=event
        e.preventDefault();
        try {
            setData({
                loading:true
            })
            //console.log("okokokokok");
            //Lets create an object of FormData Class

            //let object = new ClassName();
            let data = new FormData();
            data.append('files',file)

            //Promise Chain

            //await always wait for Promise Object(po)

            let upload_response =   await axios({
                method: 'POST',
                url:`${config.dev_api_url}/api/upload`,
                data,
                onUploadProgress : (progress)=>{
                    //console.log("fileuplode",progress);
                    setData({
                        loading:true,
                        percent: Math.round(progress.loaded / progress.total * 100)
                    });
                }
            })
            console.log('file upload response ',upload_response.data)
            if(upload_response.status === 200){
                console.log('file upload response ',upload_response)
                toast("File Upload Successfully");
                //swal("Good job!", "File Upload Successfully", "success");
                
            }else{
                toast("File Upload Successfully");
            }

            setData({
                loading:false
            })

        } catch (error) {
            console.log(error);
        }
    }

    //3.return statement /return JSX
  return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pt-5">
                    <h1>File uplode using react and axios </h1>
                    <form className="mt-5" onSubmit={ (e)=>{ uplodeImage(e) } }>
                        <div className="mb-5">
                            <label htmlFor='file' className="form-label">Uplode File</label>
                            <input id='file' type="file" accept="image/*" onChange={ (e)=>{ handaleChange(e.target.files) } } name="files" className="form-control"/>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-xl">Submit</button>
                        </div>
                    </form>
                    {
                        data.loading &&
                        <div className="progress mt-5">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={data.percent} aria-valuemin={0} aria-valuemax={100} style={{width: data.percent+'%'}}>{data.percent}%</div>
                        </div>
                    }
                   
                    {
                        data.loading &&
                        <div className="progress mt-5">
                            <div className="progress-bar" role="progressbar" style={{width: data.percent+'%'}} aria-valuenow={data.percent} aria-valuemin={0} aria-valuemax={100}>{data.percent}%</div>
                        </div>
                    }
                    

                    <ToastContainer />
                </div>
            </div>
        </>
  );
}
