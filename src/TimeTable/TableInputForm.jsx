// import React, { useState, useEffect } from "react";

// export default function TableInputForm() {
//   const [workingDays, setWorkingDays] = useState("");
//   const [subjectPerDay, setSubjectPerDay] = useState("");
//   const [totalSubjects, setTotalSubjects] = useState("");
//   const [subjectData, setSubjectData] = useState([]);
//   const [timetable, setTimetable] = useState([]);
//   const [totalHours, setTotalHours] = useState(0);

//   const handleWorkingDaysChange = (e) => {
//     setWorkingDays(parseInt(e.target.value, 10));
//   };

//   const handleSubjectPerDayChange = (e) => {
//     setSubjectPerDay(parseInt(e.target.value, 10));
//   };

//   const handleTotalSubjectsChange = (e) => {
//     const newValue = parseInt(e.target.value, 10);
//     setTotalSubjects(newValue);
//     generateSubjectData(newValue);
//   };

//   const generateSubjectData = (count) => {
//     const newSubjectData = [];

//     for (let i = 0; i < count; i++) {
//       newSubjectData.push({
//         subName: "",
//         subHrs: "",
//       });
//     }

//     setSubjectData(newSubjectData);
//   };

//   const handleSubjectNameChange = (index, e) => {
//     const updatedSubjectData = [...subjectData];
//     updatedSubjectData[index].subName = e.target.value;
//     setSubjectData(updatedSubjectData);
//   };

//   const handleSubjectHrsChange = (index, e) => {
//     const updatedSubjectData = [...subjectData];
//     updatedSubjectData[index].subHrs = parseInt(e.target.value, 10);
//     setSubjectData(updatedSubjectData);
//   };

//   const calculateTotalHours = () => {
//     if (workingDays && subjectPerDay) {
//       setTotalHours(workingDays * subjectPerDay);
//     } else {
//       setTotalHours(0);
//     }
//   };

//   const generateTimeTableData = (e) => {
//     e.preventDefault();

//     // Calculate the total hours for the week
//     calculateTotalHours();

//     // Generate the timetable
//     const timetableData = [];

//     for (let day = 1; day <= workingDays; day++) {
//       const shuffledSubjects = shuffleSubjects([...subjectData]);

//       for (let subjectIndex = 0; subjectIndex < subjectPerDay; subjectIndex++) {
//         if (shuffledSubjects.length > 0) {
//           const subject = shuffledSubjects.pop();
//           const subName = subject.subName;
//           const subHrs = subject.subHrs || 0;

//           timetableData.push({
//             day: day,
//             subject: subName,
//             subHrs: subHrs,
//           });
//         }
//       }
//     }

//     setTimetable(timetableData);
//   };

//   // Shuffle an array randomly
//   const shuffleSubjects = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   useEffect(() => {
//     calculateTotalHours();
//   }, [workingDays, subjectPerDay]);

//   return (
//     <div>
//       <h2>Input Parameters for generating a time table:</h2>
//       <form style={{ padding: "20px" }}>
//         <table style={{ width: "35%" }}>
//           <tbody>
//             <tr>
//               <td>
//                 <label htmlFor="noOfWorkingDays">
//                   Enter the number of working days:
//                 </label>
//               </td>
//               <td>
//                 <input
//                   required
//                   type="number"
//                   id="noOfWorkingDays"
//                   name="noOfWorkingDays"
//                   value={workingDays}
//                   onChange={handleWorkingDaysChange}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <label htmlFor="noOfSubjectPerDay">
//                   Enter the number of subjects per day:
//                 </label>
//               </td>
//               <td>
//                 <input
//                   required
//                   type="number"
//                   id="noOfSubjectPerDay"
//                   name="noOfSubjectPerDay"
//                   value={subjectPerDay}
//                   onChange={handleSubjectPerDayChange}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <label htmlFor="totalSubjects">
//                   Enter the total number of subjects:
//                 </label>
//               </td>
//               <td>
//                 <input
//                   required
//                   type="number"
//                   id="totalSubjects"
//                   name="totalSubjects"
//                   value={totalSubjects}
//                   onChange={handleTotalSubjectsChange}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {subjectData.length > 0 && (
//           <>
//             <h3 style={{ marginTop: "30px" }}>
//               Please fill subject name and its respective hours
//             </h3>
//             <table style={{ width: "45%" }}>
//               <tbody>
//                 {subjectData.map((subject, index) => (
//                   <tr key={index}>
//                     <td>
//                       <label htmlFor={`subjectName${index}`}>
//                         Enter Subject-{index + 1} name:
//                       </label>
//                     </td>
//                     <td>
//                       <input
//                         required
//                         type="text"
//                         id={`subjectName${index}`}
//                         name={`subjectName${index}`}
//                         value={subject.subName}
//                         onChange={(e) => handleSubjectNameChange(index, e)}
//                       />
//                     </td>
//                     <td>
//                       <label htmlFor={`subjectHrs${index}`}>
//                         Enter Subject-{index + 1} Hrs per week:
//                       </label>
//                     </td>
//                     <td>
//                       <input
//                         required
//                         type="number"
//                         id={`subjectHrs${index}`}
//                         name={`subjectHrs${index}`}
//                         value={subject.subHrs}
//                         onChange={(e) => handleSubjectHrsChange(index, e)}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         <input
//           style={{ marginTop: "30px" }}
//           type="submit"
//           value="Generate Timetable"
//           onClick={generateTimeTableData}
//         />
//       </form>

//       {totalHours > 0 && (
//         <div style={{ padding: "20px" }}>
//           <h2>Total Hours for the Week: {totalHours}</h2>
//         </div>
//       )}

//       {timetable.length > 0 && (
//         <div style={{ padding: "20px" }}>
//           <h2>Time Table</h2>
//           <table style={{ width: "100%" }}>
//             <thead>
//               <tr>
//                 <th>Day</th>
//                 <th>Subject</th>
//                 <th>Subject Hours</th>
//               </tr>
//             </thead>
//             <tbody>
//               {timetable.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.day}</td>
//                   <td>{item.subject}</td>
//                   <td>{item.subHrs}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

                                                                    // API call

import React, { useState, useEffect } from "react";

export default function TableInputForm() {
  const [dataList, setDataList] = useState([]);
  const [data, setData] = useState(null);

  const [workingDays, setWorkingDays] = useState("");
  const [subjectPerDay, setSubjectPerDay] = useState("");
  const [totalSubjects, setTotalSubjects] = useState("");
  const [subjectInputs, setSubjectInputs] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [myArray, setMyArray] = useState([]);

  const handleWorkingDaysChange = (e) => {
    setWorkingDays(parseInt(e.target.value, 10));
  };

  const handleSubjectPerDayChange = (e) => {
    setSubjectPerDay(parseInt(e.target.value, 10));
  };

  const handleTotalSubjectsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setTotalSubjects(newValue);
    SubjectInputs(newValue);
  };

  const nullHandlerError = (e) => {
    if (workingDays <= 0 || subjectPerDay <= 0 || totalSubjects <= 0) {
      alert("Please fill all the required fields");
      return;
    }
  };

  const generateTimeTableData = (e) => {
    e.preventDefault();
    nullHandlerError();
    generateFinalTimeTable();
    var dataObj = getData();
    console.log(dataObj);

    var apiPostData = {
      workingDays: workingDays,
      subjectsPerDay: subjectPerDay,
      totalSubjects: totalSubjects,
      subjectAndHrs: dataObj,
    };

    console.log(apiPostData);
    fetch("https://localhost:44390/api/GenerateTimetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPostData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const getData = () => {
    // const dataList = [];

    for (let i = 0; i < totalSubjects; i++) {
      const inputSubName = document.getElementById(`subjectName${i}`);
      const inputSubHrs = document.getElementById(`subjectHrs${i}`);

      const subjectNameValue = inputSubName ? inputSubName.value : "";
      const subjectHrsValue = inputSubHrs ? inputSubHrs.value : "";

      if (subjectNameValue == "" && subjectHrsValue == "") {
        alert("Please enter valid data");
        return;
      }

      const dataObject = {
        subName: subjectNameValue,
        subHrs: subjectHrsValue,
      };

      dataList.push(dataObject);
    }

    return dataList;
  };

  const generateFinalTimeTable = () => {
    // Create an array to hold subject and hours data
    const newSubjectData = [];

    for (let i = 0; i < totalSubjects; i++) {
      newSubjectData.push({
        subjectName: "",
        subjectHrs: "",
      });
    }

    setSubjectData(newSubjectData);
  };
  console.log(subjectData, "subjectData");

  const handleSubjectNameChange = (index, e) => {
    const subject = "subName";
    // subjectAndHrsHandler(e, index);
  };

  const handleSubjectHrsChange = (index, e) => {
    const subject = "subHrs";
    // subjectAndHrsHandler(subject, e, index);
  };

  const SubjectInputs = (count) => {
    const newInputs = [];

    for (let i = 0; i < count; i++) {
      newInputs.push(
        <tr key={i}>
          <td>
            <label htmlFor={`subjectName${i}`}>
              Enter Subject-{i + 1} name:
            </label>
          </td>
          <td>
            <input
              required
              type="text"
              id={`subjectName${i}`}
              name={`subjectName${i}`}
              value={myArray[i]}
              onChange={(e) => handleSubjectNameChange(i, e)}
            />
          </td>
          <td>
            <label htmlFor={`subjectHrs${i}`}>
              Enter Subject-{i + 1} Hrs per week:
            </label>
          </td>
          <td>
            <input
              required
              type="number"
              id={`subjectHrs${i}`}
              name={`subjectHrs${i}`}
              value={myArray[i]}
              onChange={(e) => handleSubjectHrsChange(i, e)}
            />
          </td>
        </tr>
      );
    }
    setSubjectInputs(newInputs);
  };
  console.log(dataList, "dataList");

  return (
    <div>
      <h2>Input Parameters for generating a time table: {dataList}</h2>
      <form style={{ padding: "20px" }}>
        <table style={{ width: "35%" }}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="noOfWorkingDays">
                  Enter the number of working days:
                </label>
              </td>
              <td>
                <input
                  required
                  type="number"
                  id="noOfWorkingDays"
                  name="noOfWorkingDays"
                  value={workingDays}
                  onChange={handleWorkingDaysChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="noOfSubjectPerDay">
                  Enter the number of subjects per day:
                </label>
              </td>
              <td>
                <input
                  required
                  type="number"
                  id="noOfSubjectPerDay"
                  name="noOfSubjectPerDay"
                  value={subjectPerDay}
                  onChange={handleSubjectPerDayChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="totalSubjects">
                  Enter the total number of subjects:
                </label>
              </td>
              <td>
                <input
                  required
                  type="number"
                  id="totalSubjects"
                  name="totalSubjects"
                  onChange={handleTotalSubjectsChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {subjectInputs.length > 0 && (
          <>
            <h3 style={{ marginTop: "30px" }}>
              Please fill subject name and its respective hours
            </h3>
            <table style={{ width: "45%" }}>
              <tbody>{subjectInputs}</tbody>
            </table>
          </>
        )}

        <input
          style={{ marginTop: "30px" }}
          type="submit"
          value="Submit"
          onClick={generateTimeTableData}
        />
      </form>

      {
        dataList.length > 0 && (
        <div style={{ padding: "20px" }}>
          
          <table style={{ width: "35%" }}>
          <h2>Time Table </h2>
          <tbody>
              {dataList && dataList.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{item.subName}</td>
                      <td>{item.subHrs}</td>
                    </tr>
                  </tbody>
                ))}
            </tbody>
          </table>
        </div>
          
        )
      }
    </div>
  );
}
