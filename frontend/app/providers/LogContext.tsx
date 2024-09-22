// "use client";
// import { createContext, useContext, useState } from "react";


// // Create LogContext
// // const LogContext = createContext(); // Ensure createContext() is called

// // Custom hook to use LogContext
// // export const useLogContext = () => {
// //     const context = useContext(LogContext);

// //     if (!context) {
// //         throw new Error('useLogContext must be used within a LogProvider');
// //     }

// //     return context;
// // };

// // LogProvider to wrap the component tree
// export const LogProvider = ({ children }) => {
//     const [log, setLog] = useState(false);

//     return (
//         <LogContext.Provider value={{ checklog: [log, setLog] }}>
//             {children}
//         </LogContext.Provider>
//     );
// };
