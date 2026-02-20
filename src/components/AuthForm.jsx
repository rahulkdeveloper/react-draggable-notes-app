import React, { useState } from 'react'

const AuthForm = ({ type = "login", fields = [], onSubmit }) => {
    const [name , setName] = useState(null)
    const [email, setEmail] = useState(null);
    const [password, SetPassword] = useState(null);

    const onFormSubmit = (e)=>{
        e.preventDefault();
        let payload = {email,password}
        if(type==='signup'){
            payload.name=name
        }
        onSubmit(payload)
    }

    return (
        <div>
            <h1>{type==="signup"?"Signup":"Login"} Here</h1>
            <form className='mt-5'>
                {fields.includes("name") && <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title' value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* {error.titleError && <div id="emailHelp" class="form-text text-danger">{error.titleError}</div>} */}
                </div>}

                {fields.includes("email") && <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name='email' value={email} 
                    onChange={(e)=> setEmail(e.target.value)}
                     />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>}
                {fields.includes("password" ) && <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    name='password' value={password} 
                    onChange={(e)=> SetPassword(e.target.value)}
                     />
                </div>}
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary" onClick={onFormSubmit}>{type}</button>
            </form>
        </div>
    )
}

export default AuthForm