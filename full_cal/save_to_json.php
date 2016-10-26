<?php
	$message = '';
	$error = '';

	if (isset($_POST['selectDay']) && isset($_POST['startHour']) && isset($_POST['endHour']))
	{
		if (empty($_POST["selectDay"])) {
			$error = "<label>enter 1</label>";
		}
		elseif (empty($_POST["startHour"])) {
			$error = "<label>enter 2</label>";
		}
		elseif (empty($_POST["endHour"])) {
			$error = "<label>enter 3</label>";
		}
		else
		{
			if (file_exists('cal.json')) {
				$current_data = file_get_contents('cal.json');
				$array_data = json_decode($current_data, true);
				$jsonLength = count($array_data);
				if ($jsonLength == 0) {
					$eventId = 1;
				}
				else {
					$eventId = $array_data[$jsonLength-1][id];
					$eventId++;
				}
				$extra = array(
						'id' => $eventId,
						'title' => 'TERMIN ZAREZERWOWANY',
						'start' => $_POST['selectDay'] . 'T' . $_POST['startHour'],
						'end'	=> $_POST['selectDay'] . 'T' . $_POST['endHour']

				);
				$array_data[] = $extra;
				$final_data = json_encode($array_data);	

				file_put_contents('cal.json', $final_data);
			}

		}
	}
?>