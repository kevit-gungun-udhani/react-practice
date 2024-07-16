export default function UserInput({onChange, userInput}){
    
    return(
        <section id='user-input'>
            <div id="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input type="number" onChange={(event) => onChange('initialInvestment', event.target.value)} value={userInput.initialInvestment} required/>
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input type="number" onChange={(event) => onChange('annualInvestment', event.target.value)} value={userInput.annualInvestment} required/>
                </p>
            </div>
            <div id="input-group">
                <p>
                    <label>Expected Return</label>
                    <input type="number" onChange={(event) => onChange('expectedReturn', event.target.value)} value={userInput.expectedReturn} required/>
                </p>
                <p>
                    <label>Duration</label>
                    <input type="number" onChange={(event) => onChange('duration', event.target.value)} value={userInput.duration} required/>
                </p>
            </div>
        </section>
    )
}