import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FiBox } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import Config from "../../config/Config";
import { useAuth } from "../../context/AuthContex";

export default function Home() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [allBatches, setAllBatches] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allStudentsFee, setAllStudentsFee] = useState([]);

  useEffect(() => {
    GetAllBatch();
  }, []);

  const GetAllBatch = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`${Config.SERVER_URL}/batch/getBatches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        setAllBatches(result?.batch);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    GetAllStudents();
  }, []);

  const GetAllStudents = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/student/getAllStudent`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await apiResponse.json();

      setLoading(false);
      if (result.success === true) {
        setAllStudents(result?.student);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    GetAllStudentsFee();
  }, []);

  const GetAllStudentsFee = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/studentFee/getAllStudentFee`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await apiResponse.json();
      console.log("result", result);

      setLoading(false);
      if (result.success === true) {
        setAllStudentsFee(result?.studentFee);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const totalBatches = allBatches.length;
  const totalStudents = allStudents.length;
  // console.log();

  const totalPayment = allStudentsFee.reduce(
    (acc, sum) => (acc += sum.totalAmount),
    0
  );

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <FiBox className="text-gray-800 size-6 dark:text-white/90" />
              </div>

              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Batches
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {totalBatches ? totalBatches : 0}
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <FaUsers className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Studenta
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {totalStudents ? totalStudents : 0}
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <FiBox className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Payment
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    Rs {totalPayment ? totalPayment : 0}
                  </h4>
                </div>
              </div>
            </div>
            {/* <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <FiBox className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Paid Students
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {totalpaidStudents}
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <FiBox className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Unpaid Students
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {totalUnpaidStudents}
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <FiBox className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Partial Students
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {totalPartialStudents}
                  </h4>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
