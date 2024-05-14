import React, { useState } from 'react'
import axios from "axios";

const App = () => {        
  const [myform, setMyform] = useState({    //const [email, setEmail] = useState(''); 이렇게 3개 만들어주는거와 같다! email, pwd, remember 각 input의 name을 받는것
      email: "",
      pwd: ""  
  });

  const [isChecked, setIsChecked] = useState(false); //얘는 checkBox라서 따로 관리해준다 e.target으로 checked를 뽑아와야해서
  const [responseMessage, setResponseMessage] = useState('');
  /*
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [remember, setRemember] = useState(false);
  */

const handleChange = (e) => {
  e.preventDefault();
  const { name, value } = e.target; //e.target에서 name과 value값을 뽑아온다.
  console.log(name, ":", value);
  setMyform({  //useState안에 있는 값들을 바꾸는 setMyform 이걸로 value값이 바뀌는것이다!
      ...myform, //myform의 값을 다 가지고 들어오고
      [name] : value  //name값이 같은거의 value값을 다 바꿔라. (object타입을 수정하는 방법)
  }); 
}

const handleCheckboxChange = (e) => {
  setIsChecked(e.target.checked);
}


const handleSubmit = async (e) => {
  e.preventDefault();
  //폼검증...
  const myforms = { //myform과 ischecked를 합친 myforms
    email: myform.email,
    pwd: myform.pwd,
    isChecked
  };
  try{
    const res = await axios.post('/api', myforms);
    setResponseMessage(res.data);
    setMyform({    
      email: "",
      pwd: ""  
  })
  setIsChecked(false);
  }
  catch(error){
    console.error(error);
  }
}

  return (
    <div className="container">
       <h1 className="my-5 text-center">MY FORM</h1>

        { responseMessage ? //responseMessage가 있으면!
          <div>
            <ul>
              <li>이메일 {responseMessage.email}</li>
              <li>비밀번호 {responseMessage.pwd}</li>
              <li>기억 {responseMessage.remember}</li>
            </ul>
          </div>
        :
       <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
             <label htmlFor="email" className="form-label">Email:</label>
             <input type="text" 
                    className="form-control" 
                    id="email" 
                    placeholder="Enter email" 
                    name="email" 
                    value={myform.email} //object타입으로 써준다. value값이 없으므로 아무것도 쓰지 못한다.
                    onChange={handleChange}
                    />
          </div>

          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">Password:</label>
            <input type="password" 
                    className="form-control" 
                    id="pwd" 
                    placeholder="Enter password" 
                    name="pwd" 
                    value={myform.pwd} 
                    onChange={handleChange}
                    />
          </div>

          <div className="form-check mb-3">
            <label className="form-check-label">
              <input className="form-check-input" 
                      type="checkbox" 
                      name="remember" 
                      checked={isChecked.remember} //얘는 checkBox이니 value값이 없어서 checked로 해준다. 
                      onChange={handleCheckboxChange}
                      /> 기억하기
            </label>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        }
    </div>
  )
}

export default App