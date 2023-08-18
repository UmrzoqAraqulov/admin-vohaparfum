import { Image } from "antd";

const page = () => {
  return (
    <div className="w-full py-3 bg-white my-2 rounded-md bg-opacity-20 backdrop-blur-md">
      <h2 className="text-center w-full text-white text-xl">Dashboard</h2>
      <div className="w-full h-[400px] flex items-center justify-center text-center">
        <Image
        className="rounded-md"
          src="https://w7.pngwing.com/pngs/415/969/png-transparent-pie-chart-bar-chart-diagram-graph-of-a-function-accounting-presentation-toy-block-graph-of-a-function-thumbnail.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default page