<?php
namespace Weboffice\fluidfluxtemplate\ViewHelpers\ArrayHelper;



class ExplodeViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper {


	/**
	 * Initialize
	 *
	 * @return void
	 */
	public function initializeArguments() {
		$this->registerArgument('content', 'string', 'String to be exploded)', FALSE, '');
		$this->registerArgument('as', 'string', 'Template variable name to assign. If not specified returns the result array instead');
		$this->registerArgument('addEmptyValue', 'boolean', 'Adds an empty value');

	}

	/**
	 * Render method
	 *
	 * @return array
	 */
	public function render() {
		$as = $this->arguments['as'];
		$content = $this->arguments['content'];
		$addEmptyValue = $this->arguments['addEmptyValue'];

		$contentWasSource = FALSE;
		$output = array();
		if ($addEmptyValue) $output[' '] = '';

		if (TRUE === empty($content)) {
			$content = $this->renderChildren();
			$contentWasSource = TRUE;
		}

		$t = explode(",", $content);
		foreach ($t as $it) {
			list($k,$v) = explode(":", $it);
			if (substr($v, 0, 1) == "'") $v = substr($v, 1);
			if (substr($v, -1, 1) == "'") $v = substr($v, 0, strlen($v)-1);
			$output[$k] = $v;
		}

		if (TRUE === empty($as) || TRUE === $contentWasSource) {
			return $output;
		}
		$variables = array($as => $output);
		$content = Tx_Vhs_Utility_ViewHelperUtility::renderChildrenWithVariables($this, $this->templateVariableContainer, $variables);
		return $content;

	}

}
