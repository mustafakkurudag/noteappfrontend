import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

const StudentForm = () => {
  const { state } = useLocation();
  const [student, setStudent] = useState({
    name: '',
    surname: '',
    trId: '',
    schoolNo: '',
    classRoomId: state.classRoomId,
    teacherId: state.teacherId,
    exam1Note: '',
    exam2Note: '',
    oralExamNote: ''
  });
  const navigate = useNavigate();

  const className = state.className;

  const saveStudent = async (event) => {
    event.preventDefault()
    console.log("Girilen değerler: ", student)

    const studentData = {
      name: student.name,
      surname: student.surname,
      trId: student.trId,
      schoolNumber: student.schoolNo,
      classRoomId: student.classRoomId,
      teacherId: student.teacherId,
      exam1Note: student.exam1Note,
      exam2Note: student.exam2Note,
      oralExamNote: student.oralExamNote
    }

    try {
      const response = await axios.post("/students/add", studentData);
      console.log("response status: ", response);
      navigate(0);
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({
      ...student,
      [name]: value
    });
    
  }

  return (
    <>
      <div><Header /></div>
      <div className='flex flex-col items-center justify-center w-full mt-20 ml-20'>
        <span className='text-2xl text-blue-900 font-bold'>Yeni Öğrenci Kaydı</span>
        <div className='mt-10'>
          <form onSubmit={saveStudent} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Adı
                </label>
                <input className="appearance-none block w-full bg-gray-200 
                text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
                leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
                  type="text" name="name" value={student.name} onChange={handleChange} placeholder="Adı" required />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Soyadı
                </label>
                <input className="appearance-none block w-full bg-gray-200
                text-gray-700 border border-gray-200 rounded py-3 px-4 
                leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name" type="text" name="surname" value={student.surname} onChange={handleChange} placeholder="Soyadı" required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-8">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                  TC Kimlik No
                </label>
                <input className="appearance-none block w-full bg-gray-200
                 text-gray-700 border border-gray-200 rounded py-3 px-4 
                 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-trid" maxLength={11} type="text" name="trId" value={student.trId} onChange={handleChange} placeholder="TC Kimlik No" required />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                  Okul No
                </label>
                <input className="appearance-none block w-full bg-gray-200 
                text-gray-700 border border-gray-200 rounded py-3 px-4 
                  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-schoolnumber" type="text" name="schoolNo" value={student.schoolNo} onChange={handleChange} placeholder="Okul Numarası" required />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Sınıf
                </label>
                <input className="appearance-none block w-full bg-gray-200 
                text-gray-700 border border-gray-200 rounded py-3 px-4 
                leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-classname" type="text" value={className} readOnly />
              </div>

            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                  1. Yazılı Notu
                </label>
                <input className="appearance-none block w-full bg-gray-200 
                text-gray-700 border border-gray-200 rounded py-3 px-4 
                  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-firstexam" type="text" name="exam1Note" value={student.exam1Note} onChange={handleChange}
                  min={0} max={100} placeholder="1. Yazılı Notu" required />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  2. Yazılı Notu
                </label>
                <input className="appearance-none block w-full bg-gray-200 
                text-gray-700 border border-gray-200 rounded py-3 px-4 
                  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-secondexam" type="text" name="exam2Note" value={student.exam2Note} onChange={handleChange}
                  min={0} max={100} placeholder="2. Yazılı Notu" required />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                  Sözlü Notu
                </label>
                <input className="appearance-none block w-full bg-gray-200 
                text-gray-700 border border-gray-200 rounded py-3 px-4 
                  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-secondexam" type="text" name="oralExamNote" value={student.oralExamNote} onChange={handleChange}
                  min={0} max={100} placeholder="Sözlü Notu" required />
              </div>
            </div>
            <div className='flex items-center justify-end'>
              <button className="flex-shrink-0 fixed mt-10 bg-blue-500 text-white 
            hover:font-bold text-sm py-1 w-14 rounded" type="submit">
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default StudentForm