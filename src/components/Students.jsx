import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import StudentDetail from './StudentDetail';
import SortData from './SortData';
import Header from './Header';

const Students = () => {
  const { state } = useLocation();
  const [studentList, setStudentList] = useState([]);
  const teacherId = state.teacherId;
  const className = state.className;
  const classRoomId = state.classRoomId;
  const [isOpen, setIsOpen] = useState(false);
  const [tempStudent, setTempStudent] = useState(null);
  const [sortType, setSortType] = useState("default");
  const [sortControl, setSortControl] = useState(true);

  console.log("students teacherid: ", teacherId)
  
  const handleOpen = (i = 0) => {
    setIsOpen(!isOpen);
    setTempStudent(studentList[i]);
  };

  const getData = (type) => {
    axios.get("/teachers/students/" + state.classRoomId + "?sortType=" + type)
      .then((response) => {
        console.log("students: ", response.data)
        setStudentList(response.data)
      }).catch((err) => {
        console.log("Error: ", err)
      })
  }

  const sortList = (type) => {
    setSortControl(!sortControl)
    setSortType(type)
  }

  const handleDelete = (trId) => {
    console.log(trId)
    axios.delete(`/students/deletebytrid/${trId}`)
      .then((response) => {
        getData()
        //window.location.reload()
      }).catch((err) => {
        console.log("Error: ", err)
      })
  }
 
  useEffect(() => {
    getData(sortType);
  }, [sortType])

  return (
    <div className='flex flex-col w-screen'>
      <div className='flex items-center justify-center h-1/5'>
        <Header />
      </div>
      <div className='flex items-start justify-end mr-10'>
        <button className='p-1 pl-4 pr-4 bg-blue-500 text-lg  rounded-lg text-white font-bold mb-3 mr-10'>
          <Link to={`/teachers/${teacherId}/new-student`}
            state={{ className, classRoomId, teacherId }}>
            Yeni Kayıt
            </Link>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-10 ml-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col">
              <div className="flex items-center">
                Öğrenci Adı {
                !sortControl ? 
                  <div onClick={() => sortList("a-z")}><SortData /></div>
                  :
                  <div onClick={() => sortList("z-a")}><SortData /></div>
                }
                </div>
              </th>
              <th scope="col">
              <div className="flex items-center">
                1. Yazılı {
                !sortControl ? 
                  <div onClick={() => sortList("0-9-exam1")}><SortData /></div>
                  :
                  <div onClick={() => sortList("9-0-exam1")}><SortData /></div>
                }
                </div>
              </th>
              <th scope="col">
              <div className="flex items-center">
                2. Yazılı {
                !sortControl ? 
                  <div onClick={() => sortList("0-9-exam2")}><SortData /></div>
                  :
                  <div onClick={() => sortList("9-0-exam2")}><SortData /></div>
                }
                </div>
              </th>
              <th scope="col">
              <div className="flex items-center">
                Sözlü{
                !sortControl ? 
                  <div onClick={() => sortList("0-9-oralExam")}><SortData /></div>
                  :
                  <div onClick={() => sortList("9-0-oralExam")}><SortData /></div>
                }
                </div>
              </th>
              <th scope="col">
              <div className="flex items-center">
                Ortalama / Durum {
                !sortControl ? 
                  <div onClick={() => sortList("0-9-average")}><SortData /></div>
                  :
                  <div onClick={() => sortList("9-0-average")}><SortData /></div>
                }
                </div>
              </th>
              <th scope="col">
                Seçenekler
              </th>
            </tr>
          </thead>
          <tbody>
            {
              studentList.map((student, i) => (
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.name} {student.surname}
                  </th>
                  <td>
                    {student.exam1Note}
                  </td>
                  <td>
                    {student.exam2Note}
                  </td>
                  <td>
                    {student.oralExamNote}
                  </td>
                  <td className="font-bold">
                    {student.average}&nbsp; / &nbsp;
                    {
                      student.status === 'Geçti!' ?
                        <span className='text-green-400'>Geçti!</span> 
                        :
                        <span className='text-red-600'>Kaldı!</span>
                    }
                  </td>
                  <td className='text-left'>
                    <button onClick={() => handleDelete(Object.values(student)[2])} className='p-1 pl-4 pr-4 bg-blue-400 text-sm  rounded-lg text-red-700 font-bold'>
                      Sil
                    </button>
                    <StudentDetail
                      std={{ tempStudent }}
                      isDialogOpened={isOpen}
                      handleCloseDialog={() => setIsOpen(false)}
                    />
                    <button onClick={() => handleOpen(i)} className='ml-2 p-1 pl-4 pr-4 bg-blue-400 text-sm  rounded-lg text-white font-bold'>
                      Detay
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {/* <div className='flex justify-end bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 mb-2 mr-2" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing 
          <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
            </li>
            <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
    </div>
      */ }
      </div>
    </div>
  )
}

export default Students