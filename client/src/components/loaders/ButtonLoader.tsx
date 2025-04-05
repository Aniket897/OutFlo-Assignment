import { Loader } from "lucide-react";

function ButtonLoader() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Loader className="animate-spin" />
      <p>loading..</p>
    </div>
  );
}

export default ButtonLoader;
