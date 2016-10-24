<?php
	$message = '';
	$error = '';

			if (file_exists('cal.json')) {
				$current_data = file_get_contents('cal.json');
				$array_data = json_decode($current_data, true);
                
                unset($array_data[0]);

				$final_data = json_encode($array_data);	
                file_put_contents('cal.json', $final_data);

			}
			else
			{
				$error = 'json not exist';
			}
		
	
?>