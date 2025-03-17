
export const Ranking = () => {
	const today = new Date();
	const todayFormated = today.toLocaleDateString("pt-BR");
	

  	return (
		<>
		 	<h1>Ranking Da Rua</h1>
			<span>{todayFormated}</span>
			
  		</>
	)
};
