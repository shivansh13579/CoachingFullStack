export default {
  SERVER_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:8000/api/v1"
      : "https://coachingfullstack.onrender.com",
};
