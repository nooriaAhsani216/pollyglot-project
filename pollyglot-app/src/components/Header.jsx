import parrotImg from "../assets/images/Frame 7.png"
export default function Header() {
  return (
    <div className="flex justify-center">
      <img
        src={parrotImg}
        className="w-full h-30 object-cover"
      />
    </div>
  )
}
