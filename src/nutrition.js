export default function GetNutrCost(props) {

    return(
        <div>
            <h2>Nutrition & Cost</h2>
            <table>
                <tr>
                    <td>
                        Per serving:
                        298 calories<br />
                        38.9g carbohydrates<br />
                        3.6g protein<br />
                        15.6g fat<br />
                        $0.26
                    </td>
                    <td>
                        Entire recipe:<br />
                        {(298*24).toFixed(2)} calories<br />
                        {(38.9*24).toFixed(2)}g carbohydrates<br />
                        {(3.6*24).toFixed(2)}g protein<br />
                        {(15.6*24).toFixed(2)}g fat<br />
                        ${(0.26*24).toFixed(2)}
                    </td>
                </tr>
            </table>
        </div>
    );
}