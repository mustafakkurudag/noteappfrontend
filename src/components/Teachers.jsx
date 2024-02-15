import React, { useEffect, useState } from 'react'
import Button from './Button'
import axios from 'axios';
import Header from './Header';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    const getData = () => axios.get("/teachers/all")
        .then((response) => {
            setTeachers(response.data)
        }).catch((err) => {
            console.log("Error: ", err)
        })

    useEffect(() => {
        getData();
    }, [])
    console.log("teacherResponse: ", teachers)

    return (
        <><Header />
        <div className='flex flex-col items-center justify-between mt-20'>
            <h2>Öğretmenlerimiz: </h2><br/>
            <div className='flex items-center'>{
                teachers.map((teacher) => (
                    <div key={teacher.id}>
                        <Button
                            teacherId={teacher.id}
                            teacherName={teacher.name}
                            teacherSurname={teacher.surname}
                            className={teacher.className}
                            classRoomId={teacher.classRoomId}
                        />
                    </div>
                )
                )
            }
            </div>
        </div>
        </>
    )
}

export default Teachers