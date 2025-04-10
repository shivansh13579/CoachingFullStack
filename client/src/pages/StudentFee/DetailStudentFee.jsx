import React, { useEffect, useState } from "react";
import Config from "../../config/Config";
import { useParams } from "react-router";

function DetailStudentFee() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) getStudentFee();
  }, [id]);

  const getStudentFee = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/studentFee/getStudentId/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        setStudents(result.studentFee);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Student Fee Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
        {/* Left Column */}
        <div className="space-y-4">
          <DetailItem label="Name" value={students[0]?.student?.studentName} />
          <DetailItem
            label="Father Name"
            value={students[0]?.student?.fatherName}
          />
          <DetailItem label="Mobile No." value={students[0]?.student?.mobile} />
          <DetailItem
            label="Total Paid Amount"
            value={`₹${students[0]?.totalAmount}`}
            valueClass="text-green-600 dark:text-green-400"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Payment Details
          </h2>
          <div className="space-y-6  pr-2">
            {students[0]?.payments?.map((payment, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm"
              >
                <DetailItem
                  label="Paid Amount"
                  value={`₹${payment.amount}`}
                  valueClass="text-green-600 dark:text-green-400"
                />
                <DetailItem
                  label="Status"
                  value={payment.status}
                  valueClass="text-blue-600 dark:text-blue-400"
                />
                <DetailItem
                  label="Batch Name"
                  value={payment.batch?.batchName}
                  valueClass="text-purple-600 dark:text-purple-400"
                />
                <DetailItem
                  label="Date"
                  value={new Date(payment.createdAt).toLocaleDateString()}
                  valueClass="text-gray-700 dark:text-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Component
const DetailItem = ({ label, value, valueClass = "" }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
      {label}:
    </span>
    <span className={`mt-1 text-base font-semibold ${valueClass}`}>
      {value || "N/A"}
    </span>
  </div>
);

export default DetailStudentFee;
