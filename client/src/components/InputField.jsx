import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const InputField = () => {
    const [value, setValue] = useState('');
    const [results, setResults] = useState([]); // Store API results
    const [totalResults, setTotalResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // Utility to limit text length (8-10 words)
    const truncateText = (text, wordLimit = 8) => {
        if (!text) return text;
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return ''; // Return empty if no path is provided
      
        // Extract the image ID by splitting the path and getting the last part (e.g., '9161711.jpg')
        const imageFile = imagePath.split('/').pop();
      
        // Construct the full URL with the base URL and image path
        return `https://img.tmsearch.ai/img/210/${imagePath}`;
      };

    useEffect(() => {
        if (!value) {
            setResults([]); // Reset results if input is empty
            setTotalResults(null);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            console.log("Fetching data for:", value);

            try {
                const response = await fetch(
                    `http://localhost:5000/api/search?keyword=${value}` // Now using your backend
                );

                console.log("Response received:", response);

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                // console.log("API Response:", data);

                setTotalResults(data.total || 0);
                setResults(Array.isArray(data.result) ? data.result : []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setTotalResults(0);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [value]);

    return (
        <>
            {/* INPUT FIELD */}
            <div className="p-5 pb-1 relative w-full">
                <Search className="absolute left-3 top-2.5 text-gray-500 translate-x-4 translate-y-5" />
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter your Trademark..."
                    className="border border-gray-300 rounded-lg pl-10 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:text-sm"
                />
                {loading && <p className="mt-2 text-gray-500">Loading...</p>}
                {totalResults !== null && !loading && (
                    <p className="mt-5 text-gray-700">Total results: {totalResults}</p>
                )}
            </div>

            {/* RESULTS TABLE */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-full w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-5 text-left">Trademark</th>
                            <th className="border p-5 text-left hidden md:table-cell">Image</th>
                            <th className="border p-5 text-left hidden md:table-cell">Application</th>
                            <th className="border p-5 text-left hidden md:table-cell">Granted</th>
                            <th className="border p-5 text-left hidden md:table-cell">Acc. %</th>
                            <th className="border p-5 text-left">Classes</th>
                            <th className="border p-5 text-left">Countries</th>
                            <th className="border p-5 text-left hidden md:table-cell">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length > 0 ? (
                            results.map((item, index) => (
                                <tr key={index}>
                                    <td className="border p-5 break-words">{truncateText(item.verbal, 8) || 'N/A'}</td>
                                    <td className="border p-5 hidden md:table-cell">
                                        <img
                                            src={getImageUrl(item.img)} // Dynamically generate the image URL
                                            alt="tm.logo"
                                            className="max-w-[80px] h-auto object-contain"
                                        />
                                    </td>
                                    <td className="border p-5 hidden md:table-cell break-words">{truncateText(item.app, 8) || 'N/A'}</td>
                                    <td className="border p-5 hidden md:table-cell break-words">{truncateText(item.granted, 8) || 'N/A'}</td>
                                    <td className="border p-5 hidden md:table-cell break-words">{item.accuracy || 0}%</td>
                                    <td className="border p-5 break-words">{item.class ? truncateText(item.class.join(', '), 8) : 'N/A'}</td>
                                    <td className="border p-5 break-words">{item.protection ? truncateText(item.protection.join(', '), 8) : 'N/A'}</td>
                                    <td className="border p-5 hidden md:table-cell break-words">{truncateText(item.status, 8) || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="border p-5 text-center">
                                    {loading ? 'Loading results...' : 'No results found'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default InputField;




// 2
// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';

// const InputField = () => {
//     const [value, setValue] = useState('');
//     const [results, setResults] = useState([]); // Store API results
//     const [totalResults, setTotalResults] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleChange = (event) => {
//         setValue(event.target.value);
//     };

//     // Utility to limit text length (8-10 words)
//     const truncateText = (text, wordLimit = 8) => {
//         if (!text) return text;
//         const words = text.split(' ');
//         if (words.length > wordLimit) {
//             return words.slice(0, wordLimit).join(' ') + '...';
//         }
//         return text;
//     };

//     useEffect(() => {
//         if (!value) {
//             setResults([]); // Reset results if input is empty
//             setTotalResults(null);
//             return;
//         }

//         const fetchData = async () => {
//             setLoading(true);
//             console.log("Fetching data for:", value);

//             try {
//                 const response = await fetch(
//                     `http://localhost:5000/api/search?keyword=${value}` // Now using your backend
//                 );

//                 console.log("Response received:", response);

//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//                 const data = await response.json();
//                 // console.log("API Response:", data);

//                 setTotalResults(data.total || 0);
//                 setResults(Array.isArray(data.result) ? data.result : []);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setTotalResults(0);
//                 setResults([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [value]);

//     return (
//         <>
//             {/* INPUT FIELD */}
//             <div className="p-5 pb-1 relative w-full">
//                 <Search className="absolute left-3 top-2.5 text-gray-500 translate-x-4 translate-y-5" />
//                 <input
//                     type="text"
//                     value={value}
//                     onChange={handleChange}
//                     placeholder="Enter your Trademark..."
//                     className="border border-gray-300 rounded-lg pl-10 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:text-sm"
//                 />
//                 {loading && <p className="mt-2 text-gray-500">Loading...</p>}
//                 {totalResults !== null && !loading && (
//                     <p className="mt-5 text-gray-700">Total results: {totalResults}</p>
//                 )}
//             </div>

//             {/* RESULTS TABLE */}
//             <div className="overflow-x-auto w-full">
//                 <table className="min-w-full w-full table-auto border-collapse">
//                     <thead>
//                         <tr>
//                             <th className="border p-5 text-left">Trademark</th>
//                             <th className="border p-5 text-left">Image</th>
//                             <th className="border p-5 text-left">Application</th>
//                             <th className="border p-5 text-left">Granted</th>
//                             <th className="border p-5 text-left">Acc. %</th>
//                             <th className="border p-5 text-left">Classes</th>
//                             <th className="border p-5 text-left">Countries</th>
//                             <th className="border p-5 text-left">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {results.length > 0 ? (
//                             results.map((item, index) => (
//                                 <tr key={index}>
//                                     <td className="border p-5 break-words">{truncateText(item.verbal, 8) || 'N/A'}</td>
//                                     <td className="border p-5">
//                                         <img src={item.img || ''} alt="" className="max-w-[100px] h-auto object-contain" />
//                                     </td>
//                                     <td className="border p-5 break-words">{truncateText(item.app, 8) || 'N/A'}</td>
//                                     <td className="border p-5 break-words">{truncateText(item.granted, 8) || 'N/A'}</td>
//                                     <td className="border p-5 break-words">{item.accuracy || 0}%</td>
//                                     <td className="border p-5 break-words">{item.class ? truncateText(item.class.join(', '), 8) : 'N/A'}</td>
//                                     <td className="border p-5 break-words">{item.protection ? truncateText(item.protection.join(', '), 8) : 'N/A'}</td>
//                                     <td className="border p-5 break-words">{truncateText(item.status, 8) || 'N/A'}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="8" className="border p-5 text-center">
//                                     {loading ? 'Loading results...' : 'No results found'}
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default InputField;