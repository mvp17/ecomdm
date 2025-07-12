interface Props {
  message: string;
  type: "success" | "error";
}

export default function OrderMessage({ message, type }: Props) {
  const color = type === "success" ? "text-green-600" : "text-red-600";
  return <div className={`mt-2 text-sm ${color}`}>{message}</div>;
}
