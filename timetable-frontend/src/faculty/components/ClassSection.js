import React from 'react'
import "./table.css"
import {Button,Modal} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import swal from 'sweetalert';
import SideBar from './SideBar'


  function ReportClassModal(props) {
    const [id, setID] = useState("");
    const [classroom_no,setclassroom_no] = useState("");
    const [classroom_type,setclassroom_type] = useState("");
    const [classroom_floor,setclassroom_floor] = useState("");
    const [status,setStatus] = useState("");
    const [data,setData] = useState([]);
    // console.warn("props",props.id)
  
    


      const ReportClassroom =  async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("id", id)
      formData.append("classroom_no",classroom_no)
      formData.append("classroom_type",classroom_type)
      formData.append("classroom_floor",classroom_floor)
      formData.append("status",status)
      let result = await fetch('http://127.0.0.1:8000/api/ClassroomReportupdate/',{
        method:'POST',
        body:formData
      
      });
      if (result.status == 200) {
        swal({
          title: "success!",
          text: "your course updated!",
          icon: "success",
          button: "ok!",
        });
      }
      else {
        swal({
          title: "Ops!",
          text: "something went wrong!",
          icon: "warning",
          button: "ok!",
        });
      }
     props.onHide()
     props.get()
      
    }
    async function prefillData() {
      let result = await fetch('http://127.0.0.1:8000/api/prefillClassroom/'+props.id);
      result = await result.json();
      setData(result)
      setID(data.id)
      setclassroom_no(data.classroom_no)
      setclassroom_type(data.classroom_type)
      setclassroom_floor(data.classroom_floor)
      setStatus(data.status)
    }

    useEffect( ()=>{
         prefillData()
      },[props])
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className='head' closeButton>
           <div className="text-light text-center">
              <h1>Class Room</h1>
           </div>
          </Modal.Header>
          <Modal.Body>
          <div className="full_container ">
          <div className="container justify-content-center ">
            <div className="center verticle_center full_height ">
                <div className="login_form">
                  <form className='' onSubmit={(e) => ReportClassroom(e, data.id)}>
                    <fieldset className=''>
                      <div className="field ">
                        <input
                          type="text"
                          name="course"
                          placeholder="Class ID"
                          defaultValue={data.classroom_no}
                          onChange={(e)=>setclassroom_no(e.target.value)}
                        />
                      </div>
                      <div class="field">
                        <input
                          type="text"
                          name="course_name"
                          placeholder="Class Type"
                          defaultValue={data.classroom_type}
                          onChange={(e)=>setclassroom_type(e.target.value)}
                        />
                      </div>
                      <div class="field">
                        <input
                          type="text"
                          name="course_name"
                          placeholder="Class Floor"
                          defaultValue={data.classroom_floor}
                          onChange={(e)=>setclassroom_floor(e.target.value)}
                        />
                      </div>
                      <div className='login_radio'>
                        <lable className="title">Status :</lable>
                        <input
                          type="radio"
                          name="status"
                          id="active"
                          value="Active"
                          defaultChecked={data.status === "Active"}
                          onChange={(e)=>setStatus(e.target.value)}
                        />
                        <lable for="active" className="title">Active</lable>
                        <input
                          type="radio"
                          name="status"
                          id="inactive"
                          value="Inactive"
                          defaultChecked={data.status === "Inactive"}
                          onChange={(e)=>setStatus(e.target.value)}
                        />
                        <lable for="inactive" className="title">Inactive</lable>
                      </div>
                      <div className="field pt-4">
                        <input type="submit" value="Report" className="btn" />
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
        </div>
          </Modal.Body>
          <Modal.Footer className='head'>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
function ClassSection() {
 
  const [modalShow1, setModalShow1] = useState(false);
  const [update,setupdate] = useState();
  const [data,setData] = useState([]);

  useEffect( ()=>{
    getData()
  },[])


async function getData() {
    let result = await fetch('http://127.0.0.1:8000/api/fetchClassroom');
    result = await result.json();
    setData(result)
}

function changeCourseInfo(id){

  // console.log(e);

  setupdate(id)
  
}
async function search(key) {
  if(key.length>1)
  {
    let result = await fetch('http://127.0.0.1:8000/api/searchReportClassroom/'+key);
    result = await result.json();
    console.warn(result.response)
    if(result.response==="not found")
    {
      
    }
    else
    {
      setData(result)
    }
  
  }
  else
  {
    getData()
  }
}
    return (
        <>
        <SideBar/>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-12 ">
                        <div className="page_title ">
                            <h2>Class Room</h2>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center white_shd1 ">

                   

                    <div class="col-md-8 adds pt-5">
                        <div class="white_shd2 ">
                            <div className='row'>
                              <div className='col-4'>
                            <div class="">
                                   <p>show <input
                                         type="number"
                                            name="course"
                                     /> entries</p>
                                </div>
                            </div>
                            <div className='col-4 ml-auto'>
                            <div class="">
                                   <p>Search <input
                                         type="text"
                                            name="course"
                                            onChange={(e) => search(e.target.value)}
                                     /></p>
                                </div>
                            </div>
                            </div>
                                
                       
                            <table class="table pl-4">
                                        <thead class="thead-dark ">
                                            <tr>
                                                <th>#</th>
                                                <th>Class No.</th>
                                                <th>Class Type</th>
                                                <th>semester</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data.map((item)=>
                                            <tr>
                                                <td className="text-center">{item.id}</td>
                                                <td className="text-center">{item.classroom_no}</td>
                                                <td className="text-center">{item.classroom_type}</td>
                                                <td className="text-center">{item.semester}</td>
                                                <td className="text-center">{item.status}</td>
                                                <td className=''><button class='btn bg-success ml-3' onClick={() =>  { setModalShow1(true); changeCourseInfo(item.id);} }>Report</button></td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> 
                  
                        <ReportClassModal
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                        id={update}
                        get={()=>getData()}
                        

                    />
        </>
    )
}

export default ClassSection
