import FormTemplate from '../template/form';
// paypal.svg, credit-card.svg, green-checked.svg
import { OrderCommonInterface } from '../../../types/common.interface';
import Options from './Options/Payment/inde';


export default function Payment({ nextStageHandler, error }: OrderCommonInterface) {

  return (
    <>

      <FormTemplate>

        <Options
          error={error}
          nextStageHandler={nextStageHandler}
        />
      </FormTemplate>

    </>

  )
}
