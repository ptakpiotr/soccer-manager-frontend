import Enumerable from "linq";
import { MdStar } from "react-icons/md";

interface IProps {
  numberOfStars: number;
}

function StarsGenerator({ numberOfStars }: IProps) {
  return (
    <div>
      {Enumerable.range(0, numberOfStars)
        .toArray()
        .map((i) => (
          <MdStar key={`star-${i}`} color="gold" />
        ))}
    </div>
  );
}

export default StarsGenerator;
