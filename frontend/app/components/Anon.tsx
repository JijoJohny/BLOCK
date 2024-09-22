import { AnonAadhaarProof, LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
import { useEffect } from "react";

export default function Anon() {
  const [anonAadhaar] = useAnonAadhaar();
  
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);
  
  return (
    <div>



      <LogInWithAnonAadhaar  fieldsToReveal={["revealAgeAbove18", "revealPinCode"]} nullifierSeed={1318819874216132504818209157104563990171} signal="your signal" />
      {/* <p>{anonAadhaar?.status}</p> */}
      <div >
      {/* Render the proof if generated and valid */}
      {anonAadhaar?.status === "logged-in" && (
        <>
          <p>✅ Proof is valid</p>
          <AnonAadhaarProof  code={JSON.stringify(anonAadhaar.anonAadhaarProof, null, 2)}/>
        </>
        )}
    </div>
    </div>
  );
}

// import { LaunchProveModal, useAnonAadhaar } from '@anon-aadhaar/react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLogContext } from '../providers/LogContext';

// const Anon = () => {
//     const [anonAadhar] = useAnonAadhaar();
//     const [showAlert, setShowAlert] = useState(false);
//     const [estat, setEstat] = useState("");

//     const { checklog } = useLogContext();
//     const [log, setLog] = checklog;

//     // Function to get email
//     const getemail = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:3000/api/user/get-email', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 }
//             });
//             setEstat(response.data.email + ' verified');
//         } catch (error) {
//             console.error("error:", error);
//         }
//     };

//     // useEffect to call getemail once on component mount
//     useEffect(() => {
//         getemail();
//     }, []);

//     // Handle AnonAadhaar and logging status
//     useEffect(() => {
//         if (anonAadhar.status === "logged-in" || estat === localStorage.getItem('stats')) {
//             setLog(true);

//             const a = anonAadhar.anonAadhaarProofs;
//             if (a) {
//                 const parsedData = JSON.parse(a["0"].pcd);
//                 localStorage.setItem('proof', JSON.stringify(parsedData));  // Fixed typo
//                 localStorage.setItem('stats', estat);
//                 console.log("estat:", estat);
//             }
//         }
//     }, [anonAadhar, estat, log, setLog]);

//     // Show alert when log status is true
//     useEffect(() => {
//         if (log) {
//             setShowAlert(true);
//             const timer = setTimeout(() => {
//                 setShowAlert(false);
//             }, 3000); // 3 seconds timeout
//             return () => clearTimeout(timer);
//         }
//     }, [log]);

//     useEffect(() => {
//         if (showAlert === true) {
//             alert("Login Successful");
//         }
//     }, [showAlert]);

//     return (
//         <div className='text-white absolute right-3 top-5'>
//             {log !== true ? (
//                 <div>
//                     <LaunchProveModal
//                         buttonStyle={{ backgroundColor: '#9333ea', color: 'white' }}
//                         buttonTitle="Verify"
//                         nullifierSeed="113127483288210213123711461142312541791634"
//                         fieldsToReveal={["revealAgeAbove18", "revealGender"]}
//                     />
//                 </div>
//             ) : (
//                 <div className='flex justify-end items-center hover:cursor-pointer'>
//                     <p className='text-lg'>✅</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Anon;
