import React from 'react'
import { Link, useParams } from 'react-router-dom';

const Button = (props) => {
  const className = props.className;
  const classRoomId = props.classRoomId;
  const teacherId = props.teacherId;
  const teacherName = props.teacherName;
  const teacherSurname = props.teacherSurname;

  console.log("props button: ", props)

  const contentTeachers = (
    <button className='p-2 m-4 bg-blue-400 text-2xl ml-10 rounded-lg text-gray-800 font-semibold'>
      <Link to={`/teachers/${classRoomId}/students`} relative='path' 
        state={{ className:className, classRoomId:classRoomId, teacherId:teacherId, 
        teacherName:teacherName, teacherSurname:teacherSurname }}>
        {props.teacherName} {props.teacherSurname}
      </Link>
    </button>
  )


    return (
      <div>
        {contentTeachers}
      </div>
    )
   

}

export default Button