import instanceURL from "../../config/instance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleMember(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await instanceURL.post(
        "/payment/midtrans/token",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      window.snap.pay(data.token, {
        onSuccess: async function (result) {
          const { data } = await instanceURL.put("/payment/midtrans/update");
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Paksibuk</h3>
          <span className="loginDesc">
            <p>Connect with friends and the world around you.</p>
            <p>Please register as a member to get access</p>
          </span>
        </div>
        <div className="loginRight">
          <button
            type="button"
            className="loginRegisterButton"
            onClick={handleMember}
            // onClick={(e) => handleMember(e)}
          >
            Register as Member
          </button>
        </div>
      </div>
    </div>
  );
}
