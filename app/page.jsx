import BirthdayCard from "./components/BirthdayCard";

export default function Page() {
  return (
    <BirthdayCard
      photos={["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"]}
      fontUrl="/fonts/InterSignature-q20q2.ttf"
      audioUrl="/audio/luke-poem.mp3"
      autoStart={true}
    />
  );
}
