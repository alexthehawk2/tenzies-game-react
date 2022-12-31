export default function Dice(props) {
  return (
    <div
      onClick={() => {
        props.holdDice(props.id);
      }}
      className={`dice ${props.isHeld ? "is-held" : ""}`}
    >
      <span>{props.value}</span>
    </div>
  );
}
