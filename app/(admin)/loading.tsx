import { Spin } from "antd";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}

export default loading