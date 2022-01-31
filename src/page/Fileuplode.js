import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

export default function Fileuplode() {
    //1.state/hook variable
    const [file, setFile] = useState('');

    //2.function
    let handaleChange=(e)=>{
        console.log('change',e[0])
        setFile(e[0])
    }

    let uplodeImage= async (e)=>{ //Fat Arrow Function / Arrow function ES6  e=event
        e.preventDefault();
        console.log("okokokokok");
        //Lets create an object of FormData Class

        //let object = new ClassName();
        let data = new FormData();
        data.append('files',file)

        //Promise Chain

        //await always wait for Promise Object(po)

        let upload_response =   await axios({
            method: 'POST',
            url:'https://fathomless-savannah-46209.herokuapp.com/api/upload',
            data
        })

        console.log('file upload response ',upload_response)
        if(upload_response.status ===200){
            swal("Good job!", "file Upload Successfully", "success");
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
                            <input id='file' type="file" accept="image/*" onChange={ (e)=>{ handaleChange(e.target.files) } } name="files" className="form-label"/>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-xl">Submit</button>
                        </div>
                       
                    </form>
                </div>
            </div>
        </>
  );
}
